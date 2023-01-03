<template>
   <router-link :to="{name: 'users.index'}" 
        class="ml-2 font-medium text-blue-600 
        dark:text-blue-500 hover:underline">
        Voltar
    </router-link>

    <UserEmpty v-show="showMessageEmpty">
        Nenhum telefone cadastrado para esse cliente!
    </UserEmpty>

    <PreloaderSpinner v-if="loading" />

    <div v-show="!showMessageEmpty" class="w-2/3 flex bg-gray-900 shadow-md rounded p-4 mt-10 shadow-2xl">
        <div class="pl-3 text-center" v-for="address in adresses" :key="address.id">
            <div class="pl-3 text-center">
                <div class="flex">
                    <div class="flex">
                        <p class="text-white">- Cliente:</p>
                        <p class="text-gray-500 ml-5"></p>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex">
                        <p class="text-white">- Rua:</p>
                        <p class="text-gray-500 ml-5">{{address.street}}</p>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex">
                        <p class="text-white">- Bairro:</p>
                        <p class="text-gray-500 ml-5">{{address.district}}</p>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex">
                        <p class="text-white">- Número:</p>
                        <p class="text-gray-500 ml-5">{{address.number}}</p>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex">
                        <p class="text-white">- Criado em:</p>
                        <p class="text-gray-500 ml-5">{{address.created_at}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import { onMounted, ref } from 'vue';
import UserService from '@/Services/users.services';
import UserEmpty from '@/components/UserEmpty.vue'
import PreloaderSpinner from '@/components/PreloaderSpinner.vue'
import swal from 'sweetalert';

export default {
    name: 'AddressView',
    props: {
        id: {
            require: true
        },
    },
    components: {
        UserEmpty,
        PreloaderSpinner
    },
    
    setup(props){
        const adresses = ref([])
        const loading = ref(false);
        const showMessageEmpty = ref(false);

        onMounted(() => {

            loading.value = true
        
            UserService.getAddress(props.id)
                .then((response) => {
                    adresses.value = response.data.data

                    if (adresses.value.length == 0) showMessageEmpty.value = true
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
            adresses,
            loading,
            showMessageEmpty
        }
    }

}
</script>
