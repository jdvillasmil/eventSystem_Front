import { DataBase } from "../services/database.js";

export const Staff = {
  async listRoles(ctx) {
    const rows = await DataBase.query("staff_list_roles");
    return { ok: true, data: rows };
  },

  async listByEvent(ctx, eventId) {
    if (!eventId) return { ok: false, code: "VALIDATION_ERROR", error: "eventId required" };
    const rows = await DataBase.query("staff_list_by_event", [eventId]);
    return { ok: true, data: rows };
  },

  async assignToEvent(ctx, eventId, staffId, roleId, cost) {
    if (!eventId || !staffId || !roleId)
      return { ok: false, code: "VALIDATION_ERROR", error: "Missing params" };
    await DataBase.query("staff_assign_to_event", [eventId, staffId, roleId, cost]);
    return { ok: true, data: { message: "Staff asignado correctamente" } };
  },

  async updateAssignment(ctx, assignmentId, patch = {}) {
    const { roleId, cost, status } = patch;
    await DataBase.query("staff_update_assignment", [assignmentId, roleId, cost, status]);
    return { ok: true, data: { message: "Asignación actualizada" } };
  },

  async getCostSummary(ctx, eventId) {
    const rows = await DataBase.query("staff_cost_summary", [eventId]);
    return { ok: true, data: rows };
  },

  async addGeneralExpense(ctx, eventId, type, description, amount) {
    await DataBase.query("staff_add_general_expense", [eventId, type, description, amount]);
    return { ok: true, data: { message: "Gasto registrado" } };
  },

  async listGeneralExpenses(ctx, eventId) {
    const rows = await DataBase.query("staff_list_general_expenses", [eventId]);
    return { ok: true, data: rows };
  },

  async getExpensesSummary(ctx, eventId) {
    const rows = await DataBase.query("staff_expenses_summary", [eventId]);
    return { ok: true, data: rows[0] };
  }
};
