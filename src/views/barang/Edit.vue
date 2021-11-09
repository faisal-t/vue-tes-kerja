<template>
  <form
    id="modal-edit"
    class="modal fade"
    method="post"
    autocomplete="off"
    v-on:submit.prevent="create()"
  >
     <div class="modal-dialog" style="min-width: 80%">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Tambah Barang</h4>
          <button type="button" class="close" data-dismiss="modal">
            <span>x</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label class="font-weight-bold"
                  >Nama Barang <span class="text-danger">*</span></label
                >
                <input type="text" v-model="name" name="name" class="form-control" required />
              </div>

              <div class="form-group">
                <label class="font-weight-bold"
                  >Jenis Barang <span class="text-danger">*</span></label
                >
                <select class="form-control" id="jenisbarang" name="jenis_id" v-model="jenis_id">
                
                  <option v-for="(item) in data" :key="item.id" :value="item.id" >{{item.name}}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="font-weight-bold"
                  >Stok <span class="text-danger">*</span></label
                >
                <input
                  type="number"
                  name="stok"
                  class="form-control"
                  v-model="stok"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="submit" class="btn btn-primary">Simpan</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batalkan
          </button>
        </div>
      </div>
    </div>
  </form> 
</template>

<script>
export default {
  props: ["barangEdit"],
  data: () => ({
    data: "",
    name: "",
    jenis_id: "",
    stok: "",
  }),
  mounted() {
    window.axios.get("jenis").then((e) => {
      this.data = e.data.data;
    });
    
  },
  watch: {
    barangEdit() {
      window.axios.get(`barang/${this.barangEdit.id}`).then((e) => {
        this.jenis_id = e.data.jenis_id;
        this.name = e.data.name;
        this.stok = e.data.stok;
      });
    },
  },
  methods: {
    create() {
      window.axios
        .put(`barang/${this.barangEdit.id}`, {
          jenis_id: this.jenis_id,
          stok: this.stok,
          name: this.name,
        })
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>
