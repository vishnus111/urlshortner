import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUrl, updateUrl } from "../redux/slices/urlSlice";

function UrlItem({ url }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(url.title);
  const [newUrl, setNewUrl] = useState(url.originalUrl);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUrl(url.id));
  };

  const handleUpdate = () => {
    dispatch(updateUrl({ ...url, title: newTitle, originalUrl: newUrl }));
    setIsEditing(false);
  };

  return (
    <li className="list-group-item my-2  shadow-lg  ">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="form-control mb-2"
          />
          <button
            className="btn btn-success btn-sm mr-2"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="py-3 px-2">
          <h5>{url.title}</h5>
          <div style={{ wordBreak: "break-all" }}>
            <p>
              Original URL:{" "}
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url.originalUrl}
              </a>
            </p>
            <p>
              Short URL:{" "}
              <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                {url.shortUrl}
              </a>
            </p>
          </div>
          <small>Added on: {new Date(url.addedAt).toLocaleString()}</small>
          <button
            className="btn btn-primary btn-sm ml-3 mx-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          {/* <button className="btn btn-danger btn-sm ml-2" onClick={handleDelete}>
            Delete
          </button> */}
          
<button type="button" className="btn btn-danger btn-sm ml-2" data-bs-toggle="modal" data-bs-target={`#examplemodel${url.id}}`}>
  Del
</button>


<div className="modal fade" id={`examplemodel${url.id}}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{url.title}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are you sure want to delete {url.title}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
        <button className="btn btn-danger btn-sm ml-2" data-bs-dismiss="modal" onClick={handleDelete}>
            Delete
          </button>
      </div>
    </div>
  </div>
</div>
        </div>
      )}
    </li>
  );
}

export default UrlItem;
