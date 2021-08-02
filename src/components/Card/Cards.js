import React from 'react';
import Cardheader from './CardHeader/Cardheader';
import Forecast from '../Forecast/Forecast';
import SocialMedia from '../SoicalMedia/SocialMedia';
import '../Greeting';
import Spinner from '../UI/Spinner';

function Cards(props) {
  let data = <Spinner />;
  if (props.isLoaded) {
    data = (
      <main className="card__main fade-in">
        <Cardheader data={props.data} />
        <div className="flex detail-info-container flex-warp">
          <SocialMedia data={props.data} searchKey={props.searchKey} />
          <Forecast data={props.data} />
        </div>
      </main>
    );
  }
  return data;
}

export default Cards;
