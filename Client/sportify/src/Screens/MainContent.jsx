import BookingStats from "../Components/BookingStats";
import CourtsList from "../Components/CourtList";
import PlayersList from "../Components/PlayerList";
import { Link } from "react-router-dom";
import VenueList from "../Components/VenueForOwners";
import API from "../Services/api";
import { toast } from "react-toastify";

const MainContent = () => {
  const facilityOwnerId = sessionStorage.getItem("id");
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* <Header /> */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BookingStats facilityOwnerId={facilityOwnerId} />

          <div className="flex items-center justify-center">
            <Link
              to="/registervenue"
              className="mb-3 inline-block w-3/4 h-2/5 rounded text-center px-6 pb-2 py-4 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="button"
              style={{
                background:
                  "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
                color: "#ffffff",
              }}
            >
              Add Venue
            </Link>

            <Link
              to="/AddCourts"
              className="mb-3 inline-block w-3/4 h-2/5 rounded text-center mx-7 px-6 pb-2 py-4 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="button"
              style={{
                background:
                  "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
                color: "#ffffff",
              }}
            >
              Add Court
            </Link>

            <Link
              to="/profile-update"
              className="mb-3 inline-block w-5/6 h-2/5 rounded text-center mx-7 px-6 pb-2 py-4 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="button"
              style={{
                background:
                  "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
                color: "#ffffff",
              }}
            >
              Update Profile
            </Link>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <CourtsList />
          <VenueList />
          <PlayersList facilityOwnerId={facilityOwnerId} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
