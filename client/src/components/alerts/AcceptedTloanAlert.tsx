import Swal from "sweetalert2";

const AcceptedTloanAlert = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});
AcceptedTloanAlert.fire({
  icon: "success",
  title: "Loan Apporved",
});

export default { AcceptedTloanAlert };
