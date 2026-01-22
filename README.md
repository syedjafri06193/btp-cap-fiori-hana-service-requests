# SAP BTP CAP + Fiori + HANA Service Requests

A portfolio-ready SAP BTP project demonstrating:
- CAP (Node.js) OData service
- Fiori Elements UI (List Report + Object Page)
- Local dev with SQLite
- HANA-ready deployment via MTA (Cloud Foundry)
- Role-based access patterns (XSUAA-ready)

## Architecture
- CAP Service (OData V4) -> DB (SQLite local / HANA in cloud)
- Fiori Elements UI -> consumes OData service

## Prerequisites (Local)
- Node.js (LTS)
- SAP CDS Development Kit:
  ```bash
  npm i -g @sap/cds-dk
