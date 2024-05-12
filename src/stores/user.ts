
import { defineStore ,createPinia} from 'pinia'
const pinia = createPinia();
export default pinia;
export interface User{
  token:String
}
export const UserStore = defineStore('user',  {
  state:():User=>({ token: "0" })

})
