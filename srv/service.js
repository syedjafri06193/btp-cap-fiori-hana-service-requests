const cds = require("@sap/cds");

module.exports = cds.service.impl(function () {
  const { Requests } = this.entities;

  this.before(["CREATE", "UPDATE"], Requests, (req) => {
    const { title, status, priority } = req.data;

    if (title !== undefined && String(title).trim().length === 0) {
      req.error(400, "Title cannot be empty.");
    }

    const allowedStatus = ["New", "InProgress", "Resolved"];
    const allowedPriority = ["Low", "Medium", "High"];

    if (status !== undefined && !allowedStatus.includes(status)) {
      req.error(400, `Invalid status. Allowed: ${allowedStatus.join(", ")}`);
    }

    if (priority !== undefined && !allowedPriority.includes(priority)) {
      req.error(400, `Invalid priority. Allowed: ${allowedPriority.join(", ")}`);
    }
  });

  this.on("assign", async (req) => {
    const { requestID, assignee } = req.data;

    if (!requestID) req.error(400, "requestID is required.");
    if (!assignee || String(assignee).trim().length === 0) {
      req.error(400, "assignee is required.");
    }

    const tx = cds.tx(req);

    const existing = await tx.read(Requests).where({ ID: requestID });
    if (!existing) req.error(404, "Request not found.");

    await tx.update(Requests).set({ assignee }).where({ ID: requestID });

    return tx.read(Requests).where({ ID: requestID });
  });

  this.on("setStatus", async (req) => {
    const { requestID, status } = req.data;

    const allowedStatus = ["New", "InProgress", "Resolved"];
    if (!requestID) req.error(400, "requestID is required.");
    if (!allowedStatus.includes(status)) {
      req.error(400, `Invalid status. Allowed: ${allowedStatus.join(", ")}`);
    }

    const tx = cds.tx(req);

    const existing = await tx.read(Requests).where({ ID: requestID });
    if (!existing) req.error(404, "Request not found.");

    // Simple transition rule: Resolved requests cannot be reopened
    if (existing.status === "Resolved" && status !== "Resolved") {
      req.error(409, "Resolved requests cannot be reopened.");
    }

    await tx.update(Requests).set({ status }).where({ ID: requestID });
    return tx.read(Requests).where({ ID: requestID });
  });
});
