import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUrl } from '../redux/slices/urlSlice';
import { shortenUrl } from '../utils/urlShortener';

function UrlForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls.urls);
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (registeredUser && registeredUser.email === user.email && registeredUser.password === user.password) {
      if (urls.filter((u) => u.user === user.email).length >= 5) {
        alert('You can only add 5 URLs per day.');
        return;
      }
      const shortUrl = shortenUrl(url);
      dispatch(addUrl({ id: Date.now(), title, originalUrl: url, shortUrl, addedAt: new Date().toISOString(), user: user.email }));
      setTitle('');
      setUrl('');
    } else {
      alert('Invalid session. Please log in again.');
    }
  };

  return (
    <form className='p-4 bg-white border rounded shadow-lg mt-4' onSubmit={handleSubmit} >
      <h3 className='pt-3 pb-4'>Shorten your url</h3>
      <div className="form-group ">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>URL</label>
        <input
          type="url"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary my-4">
        Shorten URL
      </button>
    </form>
  );
}

export default UrlForm;
