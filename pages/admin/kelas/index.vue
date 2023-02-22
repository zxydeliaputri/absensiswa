<template>
  <div>
    <div class="row">
      <div class="col-md-5 col-10 m-auto mt-5">
        <div class="card">
          <div class="card-header bg-dark text-light">
            <h3>Daftar Kelas</h3>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr class="fw-bold text-center bg-dark text-light">
                  <th>NO</th>
                  <th>Kelas</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(k, i) in kelas" :key="k.id">
                  <td colspan="3" v-if="loading" class="text-center">
                    Sedang Memuat..
                  </td>
                  <td class="text-center">{{ i + 1 }}</td>
                  <td>{{ k.kelas }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const kelas = ref([]);
const loading = ref(true);
async function getkelas() {
  loading.value = true;
  const { data, error } = await supabase.from("kelas").select();
  kelas.value = data;
  loding.value = false;
}
onMounted(() => {
  getkelas();
});
</script>
