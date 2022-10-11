import res from './res';
export async function getBanderImg(){
    return await res.get('/api/banner')
}