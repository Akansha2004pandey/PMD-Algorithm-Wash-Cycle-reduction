import networkx as nx
import matplotlib.pyplot as plt

G = nx.DiGraph()

# Unique nodes (no duplicates)
G.add_node("21_64", label="21/64", color="#FFD966")
G.add_node("11_32", label="11/32", color="#FFD966")
G.add_node("5_16", label="5/16", color="#FFD966")
G.add_node("3_8", label="3/8", color="#B7DDE8")
G.add_node("1_4", label="1/4", color="#B7DDE8")

# Edges according to merged structure
edges = [
    ("21_64", "11_32"),
    ("21_64", "5_16"),
    ("11_32", "3_8"),
    ("11_32", "5_16"),
    ("5_16", "3_8"),
    ("5_16", "1_4")
]
G.add_edges_from(edges)

# Tree-style hierarchical layout
def hierarchy_pos(G, root, width=1., vert_gap=0.15, vert_loc=0, xcenter=0.5):
    pos = {}
    def _rec(node, left, right, vert):
        pos[node] = ((left + right) / 2.0, vert)
        children = list(G.successors(node))
        if not children:
            return
        span = (right - left) / len(children)
        for i, ch in enumerate(children):
            _rec(ch, left + i * span, left + (i+1) * span, vert - vert_gap)
    _rec(root, 0, width, vert_loc)
    return pos

pos = hierarchy_pos(G, "21_64")

labels = {n: G.nodes[n]['label'] for n in G.nodes()}
colors = [G.nodes[n]['color'] for n in G.nodes()]

plt.figure(figsize=(4,5))
nx.draw(G, pos, labels=labels, node_color=colors, node_size=1800, font_size=9, arrows=False)
plt.axis('off')
plt.tight_layout()
plt.savefig("merged_tree.png", dpi=300)
plt.show()
