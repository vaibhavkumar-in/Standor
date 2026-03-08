export class MockSocketSimulator {
    private typingSequence = [
        { delay: 500, text: "function solve(nums: number[], target: number) {\n" },
        { delay: 1000, text: "  const map = new Map<number, number>();\n" },
        { delay: 800, text: "  \n" },
        { delay: 1200, text: "  for (let i = 0; i < nums.length; i++) {\n" },
        { delay: 600, text: "    const complement = target - nums[i];\n" },
        { delay: 1500, text: "    if (map.has(complement)) {\n" },
        { delay: 400, text: "      return [map.get(complement)!, i];\n" },
        { delay: 300, text: "    }\n" },
        { delay: 700, text: "    map.set(nums[i], i);\n" },
        { delay: 500, text: "  }\n" },
        { delay: 900, text: "  return [];\n" },
        { delay: 200, text: "}" }
    ];

    private currentIndex = 0;
    private isGenerating = false;
    private onTypeCallback: ((text: string) => void) | null = null;
    private currentCode = "";

    onType(cb: (text: string) => void) {
        this.onTypeCallback = cb;
    }

    start() {
        if (this.isGenerating) return;
        this.isGenerating = true;
        this.currentIndex = 0;
        this.currentCode = "";
        this.generateNext();
    }

    stop() {
        this.isGenerating = false;
    }

    private generateNext() {
        if (!this.isGenerating) return;
        if (this.currentIndex >= this.typingSequence.length) {
            this.isGenerating = false;
            return;
        }

        const { delay, text } = this.typingSequence[this.currentIndex];
        setTimeout(() => {
            if (!this.isGenerating) return;
            this.currentCode += text;
            if (this.onTypeCallback) {
                this.onTypeCallback(this.currentCode);
            }
            this.currentIndex++;
            this.generateNext();
        }, delay);
    }
}
