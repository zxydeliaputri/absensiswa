<template>
  <div>
    <div class="row">
      <div class="col-md-5 col-8 m-auto mt-5">
        <div class="card">
          <div class="card-header bg-dark">
            <h3 class="text-light">Absen</h3>
          </div>
          <div class="card-body">
            <div v-if="datas.length > 0" class="mb-3">
              <div v-for="(alert, index) in datas" :key="index" class="alert alert-dismissible fade show" :class="'alert-' + alert.type">
                {{ alert.message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" @click="datas.splice(index, 1)"></button>
              </div>
            </div>
            <form @submit.prevent="simpan()">
              <label for="" class="mt-3 text-dark fw-semibold">Masukan Kelas</label>
              <select class="form-select " v-model="kelas" @change="getSiswa()">
                <option v-for="k in klas" :key="k.id" :value="k.id">{{k.kelas}}</option>
              </select>
              <label for="" class="mt-3 text-dark fw-semibold">Masukan Nama Siswa</label>
              <select class="form-select" v-model="nama" >
                <option v-for="s in students" :key="s.id" :value="s.id">{{s.nama}}</option>
              </select>
              <label for="" class="mt-3 fw-semibold text-dark">keterangan</label>
              <select class="form-select mb-3" v-model="stat">
                <option v-for="g in getket" :key="g.id" :value="g.id">{{g.status}}</option>
              </select>
              <button type="submit" class="btn btn-primary">Simpan</button>
              <NuxtLink to="/" class="btn btn-warning text-light mx-3">Kembali</NuxtLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const klas = ref([])
const kelas = ref(null);
const nama = ref(null);
const stat = ref(null);
const getket = ref([]);
const datas = ref([]);
const students = ref([]);

async function simpan() {
  if (!nama.value ) {
    const alert = {
      message: "Mohon nama siswa terlebih dahulu",
      type: "danger"
    };
    datas.value.push(alert);
    return;
  }
  
  const { data, error } = await supabase.from("kehadiran").insert({
    id_siswa: nama.value,
    id_keterangan: stat.value,  
  });
      if (error) {
        console.error(error);
  }     else {
        const alert = {
      message: "Absen Berhasil Di tambahkan",
      type: "success"
    };
    datas.value.push(alert);
  }
}
async function getKelas(){
  const{data,error} = await supabase
  .from("kelas")
  .select()
  klas.value = data
}
async function getSiswa() {
  const { data, error } = await supabase
    .from("siswa")
    .select();
  students.value = data.filter((siswa) => siswa.id_kelas === kelas.value);
}

async function getKeterangan(){
  const{data,error} = await supabase
  .from("keterangan")
  .select()
  getket.value = data
}

onMounted(()=>{
  getKelas()
  getSiswa()
  getKeterangan()
})
</script>
