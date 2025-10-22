export class WorkoutUser {
  constructor({ id = null, email = '', displayName = '', photoURL = '', metadata = {} } = {}) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.metadata = metadata; // extras (e.g., provider data)
  }

  update(fields = {}) {
    Object.assign(this, fields);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      metadata: this.metadata,
    };
  }
}

export default WorkoutUser;
