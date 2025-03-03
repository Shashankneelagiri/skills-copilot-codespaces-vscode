function skillsMember() {
  return {
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    addSkill(skill) {
      this.skills.push(skill);
    },
    removeSkill(skill) {
      this.skills = this.skills.filter((s) => s !== skill);
    },
  };
}

