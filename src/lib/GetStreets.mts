import fetchProgress from "fetch-progress"

export async function callOverpassAPI(apiURL: string, query: string){
	return await fetch(
		apiURL,
		{
			method: "POST",
			body: "data=" + encodeURIComponent(query)
		},
	)
	.then(fetchProgress({
    	onProgress(progress) {
          console.log( progress.transferred );
    	}
    }))
	.then(
		(data)=>data.json()
	)
}
