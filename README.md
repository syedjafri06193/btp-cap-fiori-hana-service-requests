# Service Requests (SAP BTP)

Service Requests is a SAP BTP application built with:
- SAP Cloud Application Programming Model (CAP) - Node.js
- OData V4 service
- SAPUI5 Fiori Elements (List Report + Object Page)
- Local persistence via SQLite for development
- HANA-ready deployment via Cloud Foundry (MTA)

## Components
- `srv/` CAP service layer (OData V4)
- `db/` data model and initial seed data
- `app/service-requests/` SAPUI5 Fiori Elements UI

## Local development

### Prerequisites
- Node.js LTS
- `@sap/cds-dk` installed globally:
  ```bash
  npm i -g @sap/cds-dk
