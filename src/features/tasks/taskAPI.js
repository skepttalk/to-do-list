import axios from "axios"


const API_URL = "http://localhost:5050/todo";


export const  fetchtodolist = async() => {

    const response = await axios.get(API_URL);

    return response.data.Get;

}

export const addtaskapi = async(taskdata) => {

    const response = await axios.post(API_URL,taskdata);

    return response.data.data;

};

export const deletetaskapi = async(id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return id;
}

