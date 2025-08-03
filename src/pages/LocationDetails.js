import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LocationGallery from "../components/LocationGallery";
import LocationSpecs from "../components/LocationSpecs";
import ListingPrice from "../components/ListingPrice";
import WhereYoullSleep from "../components/WhereYoullSleep";
import ListingOffers from "../components/ListingOffers";
import DateSelector from "../components/DateSelector";
import ListingReviews from "../components/ListingReviews";
import ListingHostDetails from '../components/ListingHostDetails';
import ListingPolicies from '../components/ListingPolicies';
import { getApiUrl } from '../config';
import { useAuth } from '../AuthContext';

function LocationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigate('/locations');
  };

  const handleDashboardClick = () => {
    if (role === 'host') {
      navigate('/admin');
    } else if (role === 'guest') {
      navigate('/guest');
    }
  };

  useEffect(() => {
    async function fetchListing() {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = getApiUrl(`api/listings/${id}`);
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch listing");
        }
        const data = await res.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>Listing not found.</div>;

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "30px auto ",
        padding: 24,
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button
          onClick={handleBack}
          style={{
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          ← Back to Listings
        </button>
        {user && (
          <button
            onClick={handleDashboardClick}
            style={{
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            Back to Dashboard
          </button>
        )}
      </div>
      <h1>{listing.title}</h1>
      <div style={{ color: "#888", marginBottom: 8 }}>
        ★ {listing.ratings?.averageRating} ({listing.ratings?.totalReviews}{" "}
        reviews) - {listing.address?.city}
      </div>
      <LocationGallery images={listing.images || []} />
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
          marginTop: 24,
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>
          <LocationSpecs
            host={listing.host}
            maxGuests={listing.propertyDetails?.maxGuests}
            bedrooms={listing.propertyDetails?.bedNum}
            bathrooms={listing.propertyDetails?.bathNum}
            description={listing.description}
          />
        </div>
        <div style={{ minWidth: 320, maxWidth: 380, width: "100%" }}>
          <ListingPrice 
            basePrice={listing.pricing.basePrice} 
            cleaningFee={listing.pricing.cleaningFee} 
            serviceFee={listing.pricing.serviceFee} 
            taxes={listing.pricing.serviceFee * 0.1} 
            discount={0}
            listingId={listing._id}
            maxGuests={listing.propertyDetails.maxGuests}
          />
        </div>
      </div>
      <WhereYoullSleep
        bedrooms={listing.propertyDetails?.bedrooms}
        images={listing.images}
      />
      <ListingOffers amenities={listing.amenities} />
      <DateSelector city={listing.address?.city || listing.title} />
      <ListingReviews ratings={listing.ratings} />
      <ListingHostDetails host={listing.host} />
      <ListingPolicies houseRules={listing.houseRules} cancellationPolicy={listing.cancellationPolicy} pricing={listing.pricing} />
      {/* Add more details here as needed */}
    </div>
  );
}

export default LocationDetails;
