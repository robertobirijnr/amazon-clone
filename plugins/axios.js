import axios from 'axios';

export default axios.create({
    BaseURL: process.env.BaseURL
})