// This collection belongs to one walk only. Never persist it in browser storage.
export const bonusTrail = ['styx', 'penrose', 'memorial'];

export class ListeningProgress {
  constructor() {
    this.reset();
  }

  reset() {
    this.completed = new Set();
    this.trailStep = 0;
    this.bonusUnlocked = false;
  }

  finish(id) {
    this.completed.add(id);
    if (this.bonusUnlocked) return;
    this.trailStep = id === bonusTrail[this.trailStep]
      ? this.trailStep + 1
      : id === bonusTrail[0] ? 1 : 0;
    this.bonusUnlocked = this.trailStep === bonusTrail.length;
  }
}
