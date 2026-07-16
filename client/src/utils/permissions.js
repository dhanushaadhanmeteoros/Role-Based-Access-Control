export const ROLES = {
  ADMIN: 'Admin',
  OPERATOR: 'Operator',
};

const rolePermissions = {
  [ROLES.ADMIN]: {
    canView: true,
    canAdd: true,
    canEdit: true,
    canDelete: true,
  },
  [ROLES.OPERATOR]: {
    canView: true,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
};

export function hasPermission(role, action) {
  return Boolean(rolePermissions[role]?.[action]);
}