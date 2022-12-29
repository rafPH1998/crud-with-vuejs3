<template>

  <router-link 
      :to="{name: 'users.add'}"
      class="text-white bg-blue-700 
      hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
      font-medium rounded-lg text-sm px-5 py-2.5
      mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
      focus:outline-none dark:focus:ring-blue-800">
      +
  </router-link>

  <div
      v-show="messageSuccess"
      class="mt-5 w-5/6 p-4 mb-4 text-sm text-green-700 
      bg-green-100 dark:bg-green-200 
      dark:text-green-800" role="alert">
      <span class="font-medium">Sucesso!</span> Cliente deletado com sucesso!
  </div>

  <UserEmpty v-show="showMessageEmpty"/>
  <PreloaderSpinner v-if="loading" />

  <table 
    v-show="!showMessageEmpty"
    class="mt-7 sm:rounded-lg w-5/6 text-sm text-left 
          text-gray-500 dark:text-gray-400 shadow-2xl 
          bg-gray-900">
      <thead class="text-xs text-white uppercase dark:text-gray-400">
          <tr>
              <th scope="col" class="py-3 px-6">
                Identificação
              </th>
              <th scope="col" class="py-3 px-6">
                Nome
              </th>
              <th scope="col" class="py-3 px-6">
                E-mail
              </th>
              <th scope="col" class="py-3 px-6">
                Telefone fixo (opcional)
              </th>
              <th scope="col" class="py-3 px-6">
                Telefone celular
              </th>
          </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id">                
        <tr class="hover:bg-gray-700">
          <td class="py-4 px-6">
            {{user.id}}
          </td>
          <td class="py-4 px-6">
            {{user.name}}
          </td>
          <td class="py-4 px-6">
            {{user.cellphone}}
          </td>
          <td class="py-4 px-6">
            {{user.phone}}
          </td>
          <td class="py-4 px-6">
            {{user.cellphone}}
          </td>
          <td>
            <router-link 
              class="text-blue-500" 
              :to="{name: 'users.edit', params: {id: user.id}}">editar
            </router-link>
          </td>
          <td>
            <a
              href="#"
              @click.prevent="deleteClient(user.id)"
              class="text-red-500">deletar
            </a>
          </td>
        </tr>
      </tbody>
  </table>
</template>

<script>

import UserEmpty from '@/components/UserEmpty.vue'
import PreloaderSpinner from '@/components/PreloaderSpinner.vue'
import UserService from '@/Services/users.services';
import swal from 'sweetalert';
import { onMounted, ref } from 'vue';

export default {
  name: 'IndexView',
  components: {
    UserEmpty,
    PreloaderSpinner
  },


  setup(){
    const users = ref([])
    const showMessageEmpty = ref(false);
    const messageSuccess = ref(false);
    const loading = ref(false);

    onMounted(() => {

      loading.value = true
      
      UserService.getAll()
              .then((response) => {
                users.value = response.data.data
                if (users.value.length == 0) showMessageEmpty.value = true
              })
              .catch((errror) => {
                swal(
                    "Error!", 
                    `${errror.message}`, 
                    "error"
                );
              })
              .finally(() => {
                loading.value = false
              })
    });

    const deleteClient = (id) => {
      UserService.deleteClient (id)
                .then((response) => {
                    users.value.splice(users.value.indexOf(users), 1)
                    if (response.status == 204) {
                      messageSuccess.value = true

                      setTimeout(() => {
                          messageSuccess.value = false
                      }, 4000);
                    } 
                })
    }

    return {
      users,
      showMessageEmpty,
      messageSuccess,
      loading,
      deleteClient
    }
  }
}
</script>
