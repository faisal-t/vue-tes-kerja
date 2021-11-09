<template>
  <div>
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
            <h4 class="modal-title">Transaksi</h4>
            <button type="button" class="close" data-dismiss="modal">
              <span>x</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label class="font-weight-bold"
                    >Barang <span class="text-danger">*</span></label
                  >
                  <select v-model="barang_id" class="form-control">
                    <option
                      v-for="barang in barangs"
                      :key="barang.id"
                      :value="barang.id"
                    >
                      {{ barang.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="font-weight-bold"
                    >Terjual <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="name"
                    v-model="terjual"
                    class="form-control"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ["transaksiEdit"],
  data: () => ({
    terjual: 0,
    barang_id: "",
    barangs: [],
  }),
  mounted() {
    window.axios.get("barang").then((e) => (this.barangs = e.data.data));
  },
  watch: {
    transaksiEdit() {
      window.axios.get(`transaksi/${this.transaksiEdit.id}`).then((e) => {
        this.barang_id = e.data.barang_id;
        this.terjual = e.data.terjual;
      });
    },
  },
  methods: {
    create() {
      window.axios
        .put(`transaksi/${this.transaksiEdit.id}`, {
          barang_id: this.barang_id,
          terjual: this.terjual,
        })
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>