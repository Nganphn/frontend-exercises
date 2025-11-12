import * as React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/styles';
import MarkerClusterGroup from "react-leaflet-markercluster";
import './App.css'
import { FaPhoneAlt, FaBuilding, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function App() {
  const [courses, setCourses] = useState([])

  // use effect to load data
  useEffect(() => {
    axios
      .get('/golf_courses.json')
      .then(response => {
        setCourses(response.data.courses)
      }).catch(err => {
        console.log(err);
      });
  }, [])

  function Markers({courses}) {
    // check to ensure courses is not null/undefined and has length
    if (!courses || courses.length === 0) {
      return null;
    }

    return courses.map((course, index) => {
      // ensure individual 'course' objects are not null
      if (!course) {
        return null;
      }

      const position = [Number(course.lat), Number(course.lng)]
      const name = course.course
      const address = course.address
      const phone = course.phone
      const email = course.email
      const web = course.web
      const intro = course.text

      // return JSX within ()
      return (
        // Leaflet overlay positioned at a latitude/longitude, supports custom icons and events
        <Marker key={index} position={position}>
          {/* info window that can be attached to a Marker (or opened at any coordinate) */}
          <Popup className="course-popup" maxWidth={320} autoPan>

            <h4 className="cp-title">{name}</h4>
            <br></br>
            <ul className="cp-list">
              {address && (
                <li>
                  {/* aria-hidden="true" tells screen readers to not read the icon out loud */}
                  <FaBuilding aria-hidden="true" />
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li>
                  <FaPhoneAlt aria-hidden="true" />
                  <a href={`tel:${phone}`}>{phone}</a>
                </li>
              )}
              {email && (
                <li>
                  <MdEmail aria-hidden="true" />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {web && (
                <li>
                  <FaGlobe aria-hidden="true" />
                  <a href={web} target="_blank" rel="noreferrer">
                    {web}
                  </a>
                </li>
              )}
            </ul>
            <br></br>
            {intro && <p className="cp-intro">{intro}</p>}
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <>
      {/* root React-Leaflet component that creates and owns the Leaflet map instance */}
      <MapContainer
        // center position of the map
        center={[61.24, 25.74]}
        zoom={7}
        scrollWheelZoom={true}
      >
        {/* base-map layer that fetches map tiles (images) from a URL template like OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <Markers courses={courses} />
        </MarkerClusterGroup>
      </MapContainer>
    </>
  )
}

export default App
