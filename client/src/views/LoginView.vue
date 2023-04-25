<script>
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    components: {},
    methods: {


        handleFormSubmit() {
            axios.post('http://localhost:3000/users/login', {
                email: this.email,
                password: this.password
            })
                .then(response => {
                    // handle successful response from server
                    console.log(response);

                    // display success message to the user
                    Swal.fire({
                        icon: 'success',
                        title: 'Login successful!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    router.push('/revenue');

                })
                .catch(error => {
                    // handle error response from server
                    console.log(error);

                    // display error message to the user
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Login failed! Invalid Email or Password.',
                        confirmButtonText: 'OK'
                    });
                });
        }

    },
    computed: {},
};
</script>

<template>
    <div>
        <form @submit.prevent="handleFormSubmit">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" placeholder="email@domain.com" class="form-control" id="email"
                    aria-describedby="emailHelp" v-model="email" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" placeholder="password" class="form-control" id="password" v-model="password" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>

            <div class="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-layout="default"
                data-auto-logout-link="false" data-use-continue-as="false"></div>
        </form>
    </div>
</template>

<style scoped>
@media (min-width: 768px) {
    form {
        width: 50%;
        margin: auto;
    }
}

@media (min-width: 992px) {
    form {
        width: 25%;
        margin: auto;
    }
}
</style>
