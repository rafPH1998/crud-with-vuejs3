<template>
  <a href=""  
      class="text-white bg-blue-700 
      hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
      font-medium rounded-lg text-sm px-5 py-2.5
      mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
      focus:outline-none dark:focus:ring-blue-800">
      +
  </a>

  
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

    return {
      users,
      showMessageEmpty,
      loading
    }
  }
}
</script>
