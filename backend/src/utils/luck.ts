class PointSystem {
   //luck is a number remember that
  private health: number;
  private wealth: number;
  private luck: number;
  
  constructor(initHealth:number = 100, initWealth:number = 10, initLuck: number = 50) {
    this.health = initHealth;
    this.wealth = initWealth;
    this.luck = initLuck;
  }

  // Method to adjust LuckSystem
  adjustLuck(amount: number): void {
    this.luck = Math.max(0, Math.min(100, this.luck + amount));
  }

  adjustHealth(amount:number):void{
    this.health = Math.max(0, Math.min(100,this.health+amount));
  }

  adjustWealth(amount:number):void{
    this.wealth = Math.max(0, Math.min(100,this.wealth+amount));
  }

  // Method to get type of punishment
  private getPunishment():string{
    const roll = Math.random() * 10;
    if(roll < 5) return 'health';
    else return 'wealth';
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

  getPoints():{
    health:number;
    wealth:number;
    luck:number;
  } {
    return {
      health:this.health,
      wealth:this.wealth,
      luck:this.luck,
    };
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
    const reduceValue = -20;
    //TODO Find out better reward for this
    this.adjustLuck(reduceValue);
    const punishment = this.getPunishment();
    
    if(punishment === 'health'){
      this.adjustHealth(reduceValue);
      return 'High punishment with reducing health.'
    }
    else {
      this.adjustWealth(reduceValue);
      return 'High punishment with reducing wealth.'
    }
  }

  private midPunishment(): string {
    const reduceValue = -10;
    //TODO Find out better reward for this
    this.adjustLuck(reduceValue);
    const punishment = this.getPunishment();
    
    if(punishment === 'health'){
      this.adjustHealth(reduceValue);
      return 'Mid punishment with reducing health.'
    }
    else {
      this.adjustWealth(reduceValue);
      return 'Mid punishment with reducing wealth.'
    }
  }

  private safePunishment(): string { 
    const reduceValue = -5;
    //TODO Find out better reward for this
    this.adjustLuck(reduceValue);
    const punishment = this.getPunishment();
    
    if(punishment === 'health'){
      this.adjustHealth(reduceValue);
      return 'Low punishment with reducing health.'
    }
    else {
      this.adjustWealth(reduceValue);
      return 'Low punishment with reducing wealth.'
    }   
  }
}

export default PointSystem;
