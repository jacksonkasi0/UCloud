import React,{useState} from 'react'
import { gapi } from 'gapi-script';
import ListDocuments from '../ListDocuments';

// Client ID and API key from the Developer Console // work auth web 1 & 3

const CLIENT_ID = "103309942182-ri4g5mqa6f2gks3td2av4j1a77fuf1pb.apps.googleusercontent.com"; // this is from jacksonmari @gmail.com
const API_KEY = "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";

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive';
// 'https://www.googleapis.com/auth/drive.metadata.readonly';

const GoogleDriveAuth = () => {

  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
  const [signedInUser, setSignedInUser] = useState();
  const handleChange = (file) => { };

  /**
   * Print files.
   */
  const listFiles = (searchTerm = null) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        q: searchTerm,
      })
      .then(function (response) {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = JSON.parse(response.body);
        setDocuments(res.files);
      });
  };

  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
    console.log("gapi.auth2.getAuthInstance().signIn()")
    console.log(gapi.auth2.getAuthInstance().signIn())
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je);
      console.log("see === ",gapi.auth2.getAuthInstance().currentUser.je);
      setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      listFiles();
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  /**
   *  Sign out the user upon button click.
   */
  const handleSignOutClick = (event) => {
    setListDocumentsVisibility(false);
    gapi.auth2.getAuthInstance().signOut();
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        // apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.

          
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) { }
      );
  };

  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
  };

  const showDocuments = () => {
    setListDocumentsVisibility(true);
  };

  const onClose = () => {
    setListDocumentsVisibility(false);
  };

  return (
    <div>

      <button onClick={() => handleClientLoad()}> Click me</button>

      <ListDocuments
        visible={listDocumentsVisible}
        onClose={onClose}
        documents={documents}
        onSearch={listFiles}
        signedInUser={signedInUser}
        onSignOut={handleSignOutClick}
        isLoading={isFetchingGoogleDriveFiles}
      />
    </div>
  )
}

export default GoogleDriveAuth