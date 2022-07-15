import Swal from "sweetalert2";

const DeleteUserAlert = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

DeleteUserAlert.fire({
  title: "Are you sure you want to delete this user?",
  text: "By doing so, you will delete all information associated with it such as TLoans and RMA",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Delete Anyway",
  cancelButtonText: "Cancel",
  reverseButtons: true,
}).then((result) => {
  if (result.isConfirmed) {
    DeleteUserAlert.fire("Deleted!", "User has been deleted.", "success");
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    DeleteUserAlert.fire(
      "Cancelled",
      "User was not deleted.",
      "error"
    );
  }
});

export default { DeleteUserAlert };
