#include <bits/stdc++.h>
using namespace std;

// -------------------- GCD --------------------
int gcd(int a,int b){ return b==0?a:gcd(b,a%b); }

// -------------------- FRACTION --------------------
struct Fraction {
    int num, den;
    Fraction(int n=0,int d=1):num(n),den(d){}
    void simplify(){
        if (den == 0) return;
        int g = gcd(abs(num), abs(den));
        if (g == 0) return;
        num /= g; den /= g;
    }
    bool operator<(const Fraction& o) const {
        return num * o.den < o.num * den;
    }
    bool operator==(const Fraction& o) const {
        return num * o.den == o.num * den;
    }
    string str() const { return to_string(num) + "/" + to_string(den); }
};

// -------------------- METRICS --------------------
struct Metrics {
    int sample=0;
    int buffer=0;
    int mixing=0;
    int wash=0;
};

Metrics operator+(const Metrics& a,const Metrics& b){
    Metrics r;
    r.sample = a.sample + b.sample;
    r.buffer = a.buffer + b.buffer;
    r.mixing = a.mixing + b.mixing + 1; // combine cost
    r.wash   = a.wash + b.wash;
    return r;
}

ostream& operator<<(ostream& os, const Metrics& m){
    os << "(S=" << m.sample << ",B=" << m.buffer 
       << ",M=" << m.mixing << ",W=" << m.wash << ")";
    return os;
}

// -------------------- GLOBAL MAPS --------------------
map<Fraction,Metrics> BaseMap;     // base fractions → metrics
map<Fraction,Metrics> CacheMap;    // prepared metrics
map<Fraction,int>     UsageMap;    // usage count

// -------------------- INIT BASE MAP --------------------
void initBase(){
    BaseMap[{1,4}]   = {1,3,1,0};
    BaseMap[{2,4}]   = {2,2,1,0};
    BaseMap[{3,4}]   = {3,1,1,0};
    BaseMap[{4,4}]   = {4,0,0,0};
    BaseMap[{0,4}]   = {0,4,0,0};
    BaseMap[{1,1}]   = {4,0,0,0};

    // Simplify all keys
    map<Fraction,Metrics> simplified;
    for (auto &p : BaseMap) {
        Fraction f = p.first; f.simplify();
        simplified[f] = p.second;
    }
    BaseMap = simplified;
}

// -------------------- BUILD FIXED ARRAY TREE --------------------
vector<Fraction> buildFixedTree(Fraction root){
    // Array size = 2 * denominator (max possible tree nodes)
    int maxSize = 2 * root.den;
    vector<Fraction> heap(maxSize, Fraction(-1,1)); 
    heap[0] = root;

    for (int i = 0; i < maxSize; ++i) {
        Fraction f = heap[i];
        if (f.num == -1) continue;           // unused
        if (f.den <= 4 || f.num == 0) continue; // base node, stop expanding

        int leftIdx = 2*i + 1;
        int rightIdx = 2*i + 2;
        if (leftIdx >= maxSize || rightIdx >= maxSize) break;

        int L = (f.num + 1)/2;
        int R = f.num/2;
        Fraction left(L, f.den/2);
        Fraction right(R, f.den/2);
        left.simplify(); right.simplify();

        heap[leftIdx] = left;
        heap[rightIdx] = right;
    }

    for (int i = 0; i < maxSize; ++i) {
        if (heap[i].num == -1) continue;
      
    }
    //cout << "--------------------------------------------------------\n";
    return heap;
}

// -------------------- BOTTOM-UP PREPARATION --------------------
Metrics prepareBottomUp(Fraction root){
    root.simplify();
    vector<Fraction> heap = buildFixedTree(root);
    int maxSize = heap.size();

    Metrics global;
    CacheMap.clear();
    UsageMap.clear();

    // find last two valid indices
    int last = -1, secondLast = -1;
    for (int i = maxSize - 1; i >= 0; --i) {
        if (heap[i].num != -1) {
            if (last == -1) last = i;
            else if (secondLast == -1) { secondLast = i; break; }
        }
    }


    if (secondLast == -1 || last == -1) {
      
        return global;
    }

    Fraction left = heap[secondLast];
    Fraction right = heap[last];
   

    // combine base case
    if (BaseMap.count(left) && BaseMap.count(right)) {
        global.sample += BaseMap[left].sample + BaseMap[right].sample;
        global.buffer += BaseMap[left].buffer + BaseMap[right].buffer;
        global.mixing += BaseMap[left].mixing + BaseMap[right].mixing;
        global.wash   += BaseMap[left].wash + BaseMap[right].wash;

        CacheMap[left] = BaseMap[left];
        CacheMap[right] = BaseMap[right];
        UsageMap[left] = 1;
        UsageMap[right] = 1;
    }

    

    // bottom-up traversal
    int idx = secondLast;
    while (idx > 0) {
        int parent = (idx - 1) / 2;
        Fraction pF = heap[parent];
        if (pF.num == -1) break;

        global.mixing += 1;
        CacheMap[pF] = global;
        UsageMap[pF]=2;

        int siblingIndex = (idx % 2 == 0) ? (idx - 1) : (idx + 1);
        if (siblingIndex < maxSize && heap[siblingIndex].num != -1) {
            Fraction sibling = heap[siblingIndex];
           
            if (UsageMap.count(sibling) && UsageMap[sibling] > 0) {
                UsageMap[sibling]--;
                UsageMap[pF]--;
            } else if (CacheMap.count(sibling)) {
                global.sample += CacheMap[sibling].sample;
                global.buffer += CacheMap[sibling].buffer;
                global.mixing += CacheMap[sibling].mixing;
                global.wash   += CacheMap[sibling].wash + 1;
                UsageMap[pF]--;
                UsageMap[sibling] = 1;
            }
        }

        idx = ((parent<siblingIndex)?parent:siblingIndex);
    }

    return global;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    initBase();

    vector<pair<string,int>> tests = {
        {"3_15.csv",   15},
        {"3_31.csv",   31},
        {"3_63.csv",   63},
        {"3_127.csv",  127},
        {"3_255.csv",  255},
        {"3_511.csv",  511},
        {"3_1023.csv", 1023}
    };

    for (auto &t : tests) {
        string filename = t.first;
        int maxDen = t.second;

        ofstream fout(filename);
        if (!fout.is_open()) {
            cerr << "Error: could not write file " << filename << "\n";
            continue;
        }

        fout << "fraction,sample,buffer,mixing,wash,width,height,chip_area\n";

        for (int n = 3; n <= maxDen; n += 2) {
            Fraction f(n, maxDen + 1);   // denominator always = next power-of-2 assumption?
            Metrics res = prepareBottomUp(f);

            int width = 2;
            int height = (res.sample + res.buffer) / 2;
            int chipArea = width * height;

            fout << f.str() << ","
                 << res.sample << ","
                 << res.buffer << ","
                 << res.mixing << ","
                 << res.wash   << ","
                 << width << ","
                 << height << ","
                 << chipArea << "\n";
        }

        fout.close();
        cout << "Generated: " << filename << "\n";
    }

    return 0;
}
