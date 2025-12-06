import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import os

sns.set(style="whitegrid")
plt.rcParams["figure.dpi"] = 160

FILES = [
    "3_15.csv",
    "3_31.csv",
    "3_63.csv",
    "3_127.csv",
    "3_255.csv",
    "3_511.csv",
    "3_1023.csv"
]

OUTPUT_DIR = "graphs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------------------------------------
# LOAD ALL DATA
# ---------------------------------------
dfs = []
for f in FILES:
    df = pd.read_csv(f)
    df["dataset"] = f.replace(".csv", "")
    dfs.append(df)

data = pd.concat(dfs, ignore_index=True)

# ---------------------------------------
# Helper to save graphs
# ---------------------------------------
def save_fig(name):
    plt.savefig(os.path.join(OUTPUT_DIR, name), bbox_inches="tight")
    plt.close()

# ---------------------------------------
# 1. MIXING STEPS VS FRACTION
# ---------------------------------------
plt.figure(figsize=(10,5))
sns.lineplot(data=data, x=data.index, y="mixing", hue="dataset")
plt.title("Mixing Steps vs Target Fraction")
plt.xlabel("Fraction Index")
plt.ylabel("Mixing Steps")
save_fig("mixing_steps_vs_fraction.png")

# ---------------------------------------
# 2. WASH CYCLES VS FRACTION
# ---------------------------------------
plt.figure(figsize=(10,5))
sns.lineplot(data=data, x=data.index, y="wash", hue="dataset")
plt.title("Wash Cycles vs Target Fraction")
plt.xlabel("Fraction Index")
plt.ylabel("Wash Cycles")
save_fig("wash_vs_fraction.png")

# ---------------------------------------
# 3. SAMPLE vs BUFFER (Resource Use)
# ---------------------------------------
plt.figure(figsize=(10,5))
sns.scatterplot(data=data, x="sample", y="buffer", hue="dataset")
plt.title("Sample vs Buffer Usage")
save_fig("sample_vs_buffer.png")

# ---------------------------------------
# 4. CHIP HEIGHT / AREA TRENDS
# ---------------------------------------
plt.figure(figsize=(10,5))
sns.lineplot(data=data, x=data.index, y="chip_area", hue="dataset")
plt.title("Chip Area vs Fraction")
plt.xlabel("Fraction Index")
plt.ylabel("Chip Area")
save_fig("chip_area_vs_fraction.png")

plt.figure(figsize=(10,5))
sns.lineplot(data=data, x=data.index, y="height", hue="dataset")
plt.title("Chip Height vs Fraction")
plt.xlabel("Fraction Index")
plt.ylabel("Height")
save_fig("chip_height_vs_fraction.png")

# ---------------------------------------
# 5. RADAR CHART (PER DATASET AVERAGE)
# ---------------------------------------

def radar_chart_metrics(df, label):
    metrics = ["sample", "buffer", "mixing", "wash", "chip_area"]
    means = [df[m].mean() for m in metrics]
    
    angles = np.linspace(0, 2*np.pi, len(metrics), endpoint=False).tolist()
    means += means[:1]
    angles += angles[:1]

    plt.figure(figsize=(6,6))
    ax = plt.subplot(111, polar=True)
    ax.plot(angles, means, linewidth=2)
    ax.fill(angles, means, alpha=0.25)
    ax.set_thetagrids(np.degrees(angles[:-1]), metrics)
    plt.title(f"Radar Plot — {label}")
    save_fig(f"radar_{label}.png")

for f in FILES:
    radar_chart_metrics(
        data[data["dataset"] == f.replace(".csv", "")],
        f.replace(".csv", "")
    )

# ---------------------------------------
# 6. CORRELATION HEATMAP
# ---------------------------------------
plt.figure(figsize=(8,6))
corr = data[["sample","buffer","mixing","wash","chip_area","height"]].corr()
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("Correlation Matrix of All Metrics")
save_fig("correlation_heatmap.png")

# ---------------------------------------
# 7. SUMMARY STATISTICS
# ---------------------------------------
stats = data.groupby("dataset").agg(
    mean_mixing=("mixing","mean"),
    mean_wash=("wash","mean"),
    mean_sample=("sample","mean"),
    mean_buffer=("buffer","mean"),
    mean_area=("chip_area","mean"),
    std_mixing=("mixing","std"),
    std_wash=("wash","std")
)

stats.to_csv(os.path.join(OUTPUT_DIR, "summary_statistics.csv"))
print("\nGenerated summary_statistics.csv")

# ---------------------------------------
# OPTIONAL: MERGE ALL PNGs INTO PDF
# ---------------------------------------
try:
    from fpdf import FPDF
    pdf = FPDF()
    for img in sorted(os.listdir(OUTPUT_DIR)):
        if img.endswith(".png"):
            pdf.add_page()
            pdf.image(os.path.join(OUTPUT_DIR, img), x=10, y=10, w=180)
    pdf.output(os.path.join(OUTPUT_DIR, "All_Graphs.pdf"))
    print("Generated All_Graphs.pdf")
except:
    print("Install fpdf to auto-generate merged PDF: pip install fpdf")
