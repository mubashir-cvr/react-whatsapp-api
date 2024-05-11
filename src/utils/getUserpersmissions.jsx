
export const getPermittedActionsOfUserForObject = (object) => {
  let userPermission = localStorage.getItem("userPermissions");
  let userPermissions= JSON.parse(userPermission).permissions;

  let createPermission = userPermissions.some((permission) =>
    ["create" + object, "allAccess", "allAccessTo" + object].some(
      (reqAccess) => reqAccess === permission
    )
  );
  let updatePermission = userPermissions.some((permission) =>
    ["update" + object, "allAccess", "allAccessTo" + object].some(
      (reqAccess) => reqAccess === permission
    )
  );

  let deletePermission = userPermissions.some((permission) =>
    ["delete" + object, "allAccess", "allAccessTo" + object].some(
      (reqAccess) => reqAccess === permission
    )
  );

  return { createPermission, updatePermission, deletePermission };
};
