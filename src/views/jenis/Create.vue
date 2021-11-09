<template>
	<form id="modal-create" class="modal fade" method="post" autocomplete="off" v-on:submit.prevent="create()">
		<div class="modal-dialog" style="min-width: 80%">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Tambah Jenis Barang</h4>
					<button type="button" class="close" data-dismiss="modal">
						<span>x</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col">
							<div class="form-group">
								<label class="font-weight-bold">Nama Jenis <span class="text-danger">*</span></label>
								<input type="text" name="name" v-model="jenis" class="form-control" required>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer justify-content-between">
					<button type="submit" class="btn btn-primary">Simpan</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Batalkan</button>
				</div>
			</div>
		</div>
	</form>
</template>

<script type="text/javascript">
	export default {
		data: () => ({
			jenis: ''
		}),
		methods: {
			create() {
				window.axios.post('jenis', {
					name: this.jenis
				}).then(() => {
					window.location.reload();
				})
			}
		}
	}
</script>