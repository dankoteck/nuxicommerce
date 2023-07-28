import Swal from "sweetalert2";

declare module "#app" {
  interface NuxtApp {
    $swal: typeof Swal;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("swal", Swal);
});
