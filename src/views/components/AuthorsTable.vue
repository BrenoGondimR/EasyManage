<template>
  <div class="card">
    <div class="card-header pb-0" style="display: flex; justify-content: space-between">
      <h6>Funcionarios</h6>
      <router-link class="nav-link d-flex align-items-center me-2 active" aria-current="page" to="/create_funcionario">
        <div id="btn-white" class="btn px-3 mb-2">Novo Funcionario</div>
      </router-link>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Função</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Efetuado</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="../../assets/img/team-2.jpg"
                      class="avatar avatar-sm me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">John Michael</h6>
                    <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Manager</p>
                <p class="text-xs text-secondary mb-0">Organization</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
              </td>
              <td class="align-middle">
                <a href="javascript:;" style="text-align: right !important;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "authors-table",
};
</script>
