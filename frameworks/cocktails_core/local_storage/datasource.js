// ==========================================================================
// Project:   CocktailsCore - local storage
// Copyright: ©2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

/**
 * This data source serves as an adapter between SproutCore's data store and the
 * browser's local storage.
 *
 * Adapted from the Sproutcore TODO's example code:
 * https://github.com/sproutcore/Todos-Example/blob/localstorage/apps/todos/data_sources/local_storage.js
 *
 * @class
 * @extends SC.DataSource
 */
CocktailsCore.LocalStorage = SC.DataSource.extend(
    /** @scope CocktailsCore.LocalStorage.prototype */ {

    /**
     * The string to prefix the key used to store the data in the browser's
     * localStorage.
     *
     * @type String
     * @default 'sproutcore.local.storage'
     */
    storagePrefix: 'sproutcore.local.storage.',

    /**
     * Local cache of the records by type to be stored in local store
     * @type {Object}
     */
    dataByRecordType: {},

    createRecord: function(store, storeKey) {
        // get the record type which we need to check if the datasource should handle this call.
        var recordType = store.recordTypeFor(storeKey);

        // this datasource onlys deal with User records. Returning NO (false) tells the cascaded
        // datasource to try the next datasource.
        if(recordType !== CocktailsApp.User) { return NO; }

        // get the data hash for the record
        var data = store.readDataHash(storeKey);

        // Attempt to get a guid for the store key. The guid is the unique identifier we use when
        // dealing with records to make sure we don't have clashing IDs when creating records.
        var guid = store.idFor(storeKey);

        // if no guid generate one
        if (guid === undefined || guid === null) {
            guid = this._generateGuid(recordType);
        }

        // add our record with the generated guid to our `dataByRecordType` cache
        this._writeRecord(data, recordType, guid);

        // now our cache is updated with the new record save these changes to local storage
        this._writeDataToLocalStorage(recordType);

        // tell the store the record creation was for-filled
        store.dataSourceDidComplete(storeKey, null, guid);

        return YES ; // return YES if you handled the storeKey
    },

    retrieveRecord: function(store, storeKey, guid) {
        // get the record type which we need to check if the datasource should handle this call.
        var recordType = store.recordTypeFor(storeKey);

        // this datasource onlys deal with User records. Returning NO (false) tells the cascaded
        // datasource to try the next datasource.
        if(recordType !== CocktailsApp.User) { return NO; }

        // get our data for all records of this type
        var data = this._dataForRecordType(recordType);

        // load the record with the given guid into the store
        store.dataSourceDidComplete(storeKey, data[guid]);

        return YES; // return YES if you handled the storeKey
    },

    updateRecord: function(store, storeKey) {
        // get the record type which we need to check if the datasource should handle this call.
        var recordType = store.recordTypeFor(storeKey);

        // this datasource onlys deal with User records. Returning NO (false) tells the cascaded
        // datasource to try the next datasource.
        if(recordType !== CocktailsApp.User) { return NO; }

        // get the records data and guid
        var data = store.readDataHash(storeKey),
            guid = store.idFor(storeKey);

        // update our local cache `dataByRecordType` property
        this._writeRecord(data, recordType, guid);

        // now our cache is updated with the updated record save these changes to local storage
        this._writeDataToLocalStorage(recordType);

        // tell the store the record update was for-filled
        store.dataSourceDidComplete(storeKey, null, guid);

        return YES ; // return YES if you handled the storeKey
    },

    ////////////////////////////////
    // Internal utility functions //
    ////////////////////////////////

    /**
     * Generates a guid for a record type. If the record type has
     * never had a guid before (i.e. none exist) we set the data
     * guid to 0 so it it returned as 1 when we increment it.
     *
     * Otherwise we simply end up incrementing the last guid so that
     * we can stop any primary key clashes when creating the record.
     *
     * @param  {function} recordType    The record type we want to create the guid for
     * @return {Number}                 A unique number to use as a guid
     */
    _generateGuid: function(recordType) {
        // get all our data for the requested record type
        var data = this._dataForRecordType(recordType);

        // get the guid for the record type. If no record type
        // guid has ever been created set it to zero.
        data.__guid = data.__guid || 0;

        // return the incremented guid
        return ++data.__guid;
    },

    /**
     * Retrieves all the local data for a record type
     *
     * @param  {function} recordType    The record type we want to create the guid for
     * @return {Object}                 All the data for that record type
     */
    _dataForRecordType: function(recordType) {
        var key = this._keyForRecordType(recordType),
            dataByRecordType = this.get('dataByRecordType'),
            data = JSON.parse(localStorage.getItem(key)) || {};

        // if we have the data for the record type cached in our `dataByRecordType`
        // property get our data from that otherwise load it from local storage and
        // update `dataByRecordType` to match.
        if(!dataByRecordType[key]) {
            dataByRecordType[key] = data;
            this.set('dataByRecordType', dataByRecordType);
        }

        // return all data for all of the records with the specified type
        return dataByRecordType[key];
    },

    /**
     * We store our local records in an object and separate the records for each
     * type by a key `storagePrefix + recordTypeKey`. This method returns the key
     * for a given record type.
     * @param  {function} recordType    The record type we want the key for
     * @return {String]}                The key where we will store the record data in the
     *                                  dataByRecordType property and ultimately local storage
     */
    _keyForRecordType: function(recordType) {
        var recordTypeKey = recordType.toString();
        return this.get('storagePrefix')+recordTypeKey;
    },

    /**
     * Adds our record data with the generated guid as its primary key to our
     * `dataByRecordType` cache.
     */
    _writeRecord: function(hash, recordType, guid) {
        var data = this._dataForRecordType(recordType);
        var primaryKey = recordType.prototype.primaryKey;

        data[guid] = hash;
        hash[primaryKey] = guid;
    },

    /**
     * Saves our local `dataByRecordType` cache to the browsers local storage for
     * a given record type.
     */
    _writeDataToLocalStorage: function(recordType) {
        var dataByRecordType = this.get('dataByRecordType');
        var key = this._keyForRecordType(recordType);

        localStorage[key] = JSON.stringify(dataByRecordType[key]);
    }
});