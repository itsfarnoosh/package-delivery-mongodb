export class Package {
  _id: string;
  package_id: string;
  package_title: string;
  package_weight: number;
  package_destination: string;
  description: string;
  isAllocated: boolean;
  driver_id: string;
  createdAt: Date;

  constructor() {
    this._id = ""; // Initialize as an empty string, will be set by the backend
    this.package_id = this.generatePackageId(); // Generate a unique package ID
    this.package_title = ""; // Default title is an empty string
    this.package_weight = 0; // Default weight is 0
    this.package_destination = ""; // Default destination is an empty string
    this.description = ""; // Optional field, default to an empty string
    this.isAllocated = false; // By default, the package is not allocated
    this.driver_id = ""; // Initially, no driver is assigned
    this.createdAt = new Date(); // Default to the current date
  }

  /**
   * Generates a unique package ID in the format "PXX-XXX-123".
   * 
   * @returns {string} A unique package ID.
   */
  private generatePackageId(): string {
    const randomDigits = Math.floor(100 + Math.random() * 900); // Generates three random digits
    const randomLetters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join(''); // Generates three random uppercase letters
    return `P${randomLetters}-${randomDigits}`;
  }
}
