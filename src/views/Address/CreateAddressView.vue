<template>
     <div class="mx-auto overflow-hidden shadow-lg mb-2 bg-gray-900 border-4 rounded-lg md:w-3/6 sm:w-4/6 border-gray-400">

        <h1 class="text-white ml-9 mt-7">Adicionar um endereço para usuario: </h1>

        <form method="POST" class="px-10 py-10" action="#" @submit.prevent="storeAddress()">
            <div class="flex flex-wrap">
                <div class="w-full">
                    <label for="street" class="leading-7 text-sm text-white">Rua</label>
                    <input type="text" 
                        name="street" id="street"
                        v-model="address.street"
                        class="bg-gray-800 appearance-none rounded 
                        w-full py-2 px-3 text-white 
                        leading-tight focus:outline-none 
                        focus:shadow-outline">
                    <span 
                        class="text-red-600"
                        v-for="erro in address.errors.street" 
                        :key="erro.id">
                        {{erro}}
                    </span>
                </div>
    
                <div class="w-full">
                    <label for="district" class="leading-7 text-sm text-white">Bairro</label>
                    <input type="text" 
                        name="district" id="district" 
                        v-model="address.district"
                        class="bg-gray-800 appearance-none 
                        rounded w-full py-2 px-3 text-white 
                        leading-tight focus:outline-none 
                        focus:shadow-outline">
                    <span 
                        class="text-red-600"
                        v-for="erro in address.errors.district" 
                        :key="erro.id">
                        {{erro}}
                    </span>
                </div>

                <div class="w-full">
                    <label for="number" class="leading-7 text-sm text-white">Número da casa</label>
                    <input type="text"
                        name="number" id="number" 
                        v-model="address.number"
                        class="bg-gray-800 appearance-none rounded 
                            w-full py-2 px-3 text-white 
                            leading-tight focus:outline-none 
                            focus:shadow-outline">
                    <span 
                        class="text-red-600"
                        v-for="erro in address.errors.number" 
                        :key="erro.id">
                        {{erro}}
                    </span>
                </div>

                <button
                    :disabled="address.loading"
                    class="mt-7 focus:outline-none text-white bg-green-700 
                    hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                    dark:bg-green-600 dark:hover:bg-green-700 
                    dark:focus:ring-green-800">
                    <span v-if="address.loading">Adicionando...</span>
                    <span v-else>Adicionar</span>
                </button>

            </div>

            <router-link :to="{name: 'users.index'}" 
                class="ml-2 font-medium text-blue-600 
                dark:text-blue-500 hover:underline">
                Voltar
            </router-link>
        </form>
    </div>
</template>
   
 <script>
 
import UserService from '@/Services/users.services';
import { reactive } from 'vue';

export default {
     name: 'AddressView',
     props: {
         id: {
             require: true
         },
    },

    setup(props) {

        const address = reactive ({
            district: '',
            user_id: props.id,
            street: '',
            number: '',
            errors: '',
            loading: false
        })

        const storeAddress = () => {
            address.loading = true

            UserService.storeAddreesToClient(address.user_id, {...address})
                        .then((response) => {
                            console.log(response.status)                 
                        })
                        .catch((error) => {
                            address.errors = error.response.data.errors;
                        })    
                        .finally(() => address.loading = false)    
        }

        return {
            storeAddress,
            address
        }
    }
}
</script>
 