class LuckSystem {
  private luck: number; //luck is a number remember that

  constructor(initLuck: number = 50) {
    this.luck = initLuck;
  }

  // Method to adjust LuckSystem
  adjustLuck(amount: number): void {
    this.luck = Math.max(0, Math.min(100, this.luck + amount));
  }

  // Generate outcome based on your luck.
  getOutcome(riskLevel: "high" | "mid" | "safe"): string {
    const roll = Math.random() * 100;
    let outcome: string;
    switch (riskLevel) {
      case "high":
        outcome = roll < this.luck ? this.highReward() : this.highPunishment();
        break;
      case "mid":
        outcome = roll < this.luck ? this.midReward() : this.midPunishment();
        break;
      case "safe":
        outcome = roll < this.luck ? this.safeReward() : this.safePunishment();
        break;
      default:
        outcome = 'Invalid risk level'

    }
    return outcome;
  }

  getLuck(): number {
    return this.luck;
  }

  private highReward(): string {
    //TODO Find out better reward for this
    this.adjustLuck(20);
    return 'High reward';
  }

  private midReward(): string {
    //TODO Find out better reward for this
    this.adjustLuck(10);
    return 'Mid reward';
  }

  private safeReward(): string {
    //TODO Find out better reward for this
    this.adjustLuck(5);
    return 'Low reward';
  }


  private highPunishment(): string {
    //TODO Find out better reward for this
    this.adjustLuck(-20);
    return 'High punishment';
  }

  private midPunishment(): string {
    //TODO Find out better reward for this
    this.adjustLuck(-10);
    return 'Mid punishment';
  }

  private safePunishment(): string {
    //TODO Find out better reward for this
    this.adjustLuck(-5);
    return 'Low punishment';
  }

}

export default LuckSystem;
