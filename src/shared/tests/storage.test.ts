import { expect } from '@esm-bundle/chai';
import { clear, DB_NAME, deleteDatabase, get, getAll, getByIndex, open, put, remove, transaction } from '../storage';

describe('storage Spec:', () => {
  beforeEach(async () => {
    await deleteDatabase();
  });

  afterEach(async () => {
    await deleteDatabase();
  });

  it('opens the database with all the expected stores', async () => {
    const db = await open();
    expect(db.name).to.be.equal(DB_NAME);
    ['books', 'chapters', 'progress', 'dictionary'].forEach(store => {
      expect(db.objectStoreNames.contains(store)).to.be.equal(true);
    });
  });

  it('puts and gets a record', async () => {
    const record = { id: '1', name: 'a' };
    await put('books', record);
    expect(await get('books', '1')).to.deep.equal(record);
  });

  it('returns undefined when getting a missing record', async () => {
    expect(await get('books', 'missing')).to.be.equal(undefined);
  });

  it('getAll returns every record in the store', async () => {
    await put('books', { id: '1', name: 'a' });
    await put('books', { id: '2', name: 'b' });
    const all = await getAll('books');
    expect(all).to.have.length(2);
  });

  it('remove deletes a record', async () => {
    await put('books', { id: '1', name: 'a' });
    await remove('books', '1');
    expect(await get('books', '1')).to.be.equal(undefined);
  });

  it('clear empties the store', async () => {
    await put('books', { id: '1', name: 'a' });
    await clear('books');
    expect(await getAll('books')).to.have.length(0);
  });

  it('transaction runs the callback and awaits completion', async () => {
    await transaction('books', 'readwrite', stores => {
      stores.books.put({ id: 'tx', name: 'x' });
      stores.books.put({ id: 'ty', name: 'y' });
    });
    expect(await get('books', 'tx')).to.deep.equal({ id: 'tx', name: 'x' });
    expect(await get('books', 'ty')).to.deep.equal({ id: 'ty', name: 'y' });
  });

  it('transaction aborts when the callback throws', async () => {
    let error: Error | undefined;
    try {
      await transaction('books', 'readwrite', () => {
        throw new Error('boom');
      });
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.be.equal('boom');
  });

  it('transaction rejects when a request fails', async () => {
    let error: Error | undefined;
    try {
      await transaction('books', 'readwrite', stores => {
        stores.books.put({ missingKey: 'x' });
      });
    } catch (err) {
      error = err as Error;
    }
    expect(error).to.be.an.instanceof(Error);
  });

  it('getByIndex rejects when the index does not exist', async () => {
    let error: Error | undefined;
    try {
      await getByIndex('books', 'no-such-index', 'x');
    } catch (err) {
      error = err as Error;
    }
    expect(error).to.be.an.instanceof(Error);
  });

  it('deleteDatabase wipes the persisted data', async () => {
    await put('books', { id: '1', name: 'a' });
    await deleteDatabase();
    const db = await open();
    expect(await getAll('books')).to.have.length(0);
    expect(db.name).to.be.equal(DB_NAME);
  });
});
