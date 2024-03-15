import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

function PlaceIndex(data: any) {

	const history: any = useHistory()

	const [places, setPlaces]: any = useState([])

	useEffect(() => {
		const fetchData: any = async () => {
			const response: any = await fetch(`http://localhost:5000/places`)
			const resData: any = await response.json()
			setPlaces(resData)
		}
		fetchData()
	}, [])

	let placesFormatted: any = places.map((place: any) => {
		return (
			<div className="col-sm-6" key={place.placeId}>
				<h2>
					<a href="" onClick={() => history.push(`/places/${place.placeId}`)} >
						{place.name}
					</a>
				</h2>
				<p className="text-center">
					{place.cuisines}
				</p>
				<img style={{ maxWidth: 200 }} src={place.pic} alt={place.name} />
				<p className="text-center">
					Located in {place.city}, {place.state}
				</p>
			</div>
		)
	})
	return (
		<main>
			<h1>Places to Rant or Rave About</h1>
			<div className="row">
				{placesFormatted}
			</div>
		</main>
	)
}

export default PlaceIndex;