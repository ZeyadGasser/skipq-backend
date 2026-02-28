/**
 * Layer Responsibilities in Data Mapping:
 * * 1. Repository:
 * Fetches the complete object from the database (Raw Data).
 * * 2. Service:
 * Handles business logic (e.g., verifying if the account is active/not suspended).
 * * 3. DTO / Mapper:
 * Takes the raw object, filters the properties, and formats the final output.
 * * 4. Controller:
 * Invokes the Mapper and sends the formatted result back to the user.
 */

export class OrganizationResponseDTO {
  constructor(org) {
    this.org_id = org.org_id;
    this.org_name = org.org_name;
    this.org_description = org.org_description;
    this.org_picture = org.org_picture;
  }

  static transformList(organizations) {
    return organizations.map((org) => new OrganizationResponseDTO(org));
  }
}
