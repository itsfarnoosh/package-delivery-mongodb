export class Driver {
  _id: string;
  driver_id: string;
  driver_name: string;
  driver_department: 'Food' | 'Furniture' | 'Electronic';
  driver_licence: string;
  driver_isActive: boolean;
  driver_createdAt: Date;
  assigned_packages: string[]; // Use string[] to represent ObjectIds

  constructor() {
    this._id = "";
    this.driver_id = this.generateDriverId();
    this.driver_name = '';
    this.driver_department = 'Food'; // Default value for department
    this.driver_licence = '';
    this.driver_isActive = false;
    this.driver_createdAt = new Date(); // Default to current date
    this.assigned_packages = []; // Initialize as an empty array
  }

  /**
   * Generates a unique driver ID in the format "D12-62-ABC".
   * 
   * @returns {string} A unique driver ID.
   */
  private generateDriverId(): string {
    const randomDigits = Math.floor(10 + Math.random() * 90);
    const randomLetters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    return `D${randomDigits}-62-${randomLetters}`;
  }

  /**
   * Assigns a package to the driver by adding the package's ObjectId to the assigned_packages array.
   * 
   * @param {string} packageId - The ObjectId of the package to assign to the driver.
   */
  assignPackage(packageId: string): void {
    if (!this.assigned_packages.includes(packageId)) {
      this.assigned_packages.push(packageId);
    }
  }

  /**
   * Removes a package from the driver by removing the package's ObjectId from the assigned_packages array.
   * 
   * @param {string} packageId - The ObjectId of the package to remove from the driver.
   */
  removePackage(packageId: string): void {
    this.assigned_packages = this.assigned_packages.filter(id => id !== packageId);
  }
}
