export async function searchCities(name: string){
	let response = await fetch(`${window.location.origin}/api/search-city?cityName=${name}`);
	if(!response.ok) return null;
	const json = response.text().then(JSON.parse);
	//return json.then((val) => val.result.map((el: any) => el.name));
	return json;
}
