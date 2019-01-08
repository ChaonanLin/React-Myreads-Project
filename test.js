var url = "https://api.yelp.com/v3/businesses/search?term=boba&location=Cupertino";
var bearer = 'Bearer z5wVEJdKE4ubBZtghJiPO6o4q2Yg1FmIrUMQeDmokYyAbuESQ8xKg3VyMBLe1295B8XXHL9T6eukNH5Si6kRWCPo49y2BtUir79w2j_IQrjRUkdniJqeTWgOVUYTXHYx';
fetch(url, {
method: 'GET',
withCredentials: true,
credentials: 'include',
headers: {
    'Authorization': bearer,
    'Content-Type': 'application/json'}
})
