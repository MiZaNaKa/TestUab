import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';

class CounterStore {
    fav = false;
    constructor() {
        makeAutoObservable(this);
    }

    FavAction() {
        this.fav=true;
    }

    clear() {
        this.fav=false;
    }


    SaveFav=async(oldData)=>{
        var value =await AsyncStorage.getItem('FavList')
        var asyValue=JSON.parse(value)
        console.log(asyValue)
        if(!asyValue){
            var storeData=[oldData]
            AsyncStorage.setItem("FavList", JSON.stringify(storeData))
            this.FavAction()
        }
        else{
            var value =await AsyncStorage.getItem('FavList')
            var asyValue=JSON.parse(value)
            var search= asyValue.filter((x)=>x.id===oldData.id)
            if(search.length===0){
                var value =await AsyncStorage.getItem('FavList')
                var asyValue=JSON.parse(value)
                console.log(asyValue)
                asyValue.push(oldData)
                AsyncStorage.setItem("FavList", JSON.stringify(asyValue))
                this.FavAction()
            }
            
        }
    }
}


const counterStore = new CounterStore();
export default counterStore;