
class PointSystem {
  private health: number;
  private wealth: number;
  private luck: number;
  private actions: number;

  constructor(
    private initHealth: number = 100,
    private initWealth: number = 10,
    private initLuck: number = 50,
    private initActions: number = 0
  ) {
    this.health = initHealth;
    this.wealth = initWealth;
    this.luck = initLuck;
    this.actions = initActions;
  }

  // Adjust luck, health, or wealth within a 0-100 range
  private adjustPoints(type: "luck" | "health" | "wealth", amount: number): void {
    this[type] = Math.max(0, Math.min(100, this[type] + amount));
  }

  // Determine punishment type based on a random roll
  private getPunishmentType(): "health" | "wealth" {
    return Math.random() < 0.5 ? "health" : "wealth";
  }

  // Apply critical punishment by halving health, wealth, and luck
  private applyCriticalPunishment(): void {
    const stats:Array<"health" | "wealth" | "luck"> = ["health", "wealth", "luck"];
    stats.forEach((stat) => {
      this[stat] = Math.floor(this[stat] / 2);
    });
  }

  // Handle decay of luck after every 5 actions
  private handleLuckDecay(): void {
    if (this.actions > 0 && this.actions % 5 === 0) {
      this.adjustPoints("luck", -5);
      console.log("Luck decayed by 5");
    }
  }

  // Handle specific luck values triggering critical punishment or resetting luck
  private handleSpecificLuckValues(): boolean {
    const criticalLuckValues = [66, 69, 99];
    if (criticalLuckValues.includes(this.luck)) {
      this.applyCriticalPunishment();
      return true;
    }
    if (this.luck === 100) {
      this.luck = 50;
    }
    return false;
  }

  // Generate outcome based on risk level and luck
  getOutcome(riskLevel: "high" | "mid" | "safe"): string {
    this.actions += 1;

    if (this.handleSpecificLuckValues()) {
      return "Critical Punishment";
    }

    this.handleLuckDecay();

    const roll = Math.random() * 100;
    const outcome = roll < this.luck ? this.applyReward(riskLevel) : this.applyPunishment(riskLevel);

    return outcome;
  }

  // Apply rewards based on risk level
  private applyReward(riskLevel: "high" | "mid" | "safe"): string {
    const rewards = {
      high: 20,
      mid: 10,
      safe: 5,
    };
    this.adjustPoints("luck", rewards[riskLevel]);
    return `${riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} reward`;
  }

  // Apply punishments based on risk level
  private applyPunishment(riskLevel: "high" | "mid" | "safe"): string {
    const penalties = {
      high: -20,
      mid: -10,
      safe: -5,
    };
    this.adjustPoints("luck", penalties[riskLevel]);

    const punishmentType = this.getPunishmentType();
    this.adjustPoints(punishmentType, penalties[riskLevel]);

    return `${riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} punishment with reducing ${punishmentType}.`;
  }

  // Get current points
  getPoints(): { health: number; wealth: number; luck: number; actions: number } {
    return {
      health: this.health,
      wealth: this.wealth,
      luck: this.luck,
      actions: this.actions,
    };
  }
}

export default PointSystem;

