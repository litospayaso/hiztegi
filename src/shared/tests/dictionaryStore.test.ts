import { expect } from '@esm-bundle/chai';
import { getAllEntries, getEntry, lookup, removeEntry, upsertEntry } from '../dictionaryStore';
import { deleteDatabase } from '../storage';

describe('dictionaryStore Spec:', () => {
  beforeEach(async () => {
    await deleteDatabase();
  });

  afterEach(async () => {
    await deleteDatabase();
  });

  it('upserts an entry normalizing the word key', async () => {
    const entry = await upsertEntry({ word: '  Ura ', status: 'known', note: 'water' });
    expect(entry.word).to.be.equal('ura');
    const stored = await getEntry('URA');
    expect(stored?.status).to.be.equal('known');
    expect(stored?.note).to.be.equal('water');
  });

  it('updates an existing entry instead of duplicating it', async () => {
    await upsertEntry({ word: 'ura', status: 'known' });
    const updated = await upsertEntry({ word: 'ura', status: 'unknown', note: 'updated' });
    expect(updated.status).to.be.equal('unknown');
    expect(await getAllEntries()).to.have.length(1);
  });

  it('returns all entries', async () => {
    await upsertEntry({ word: 'ura', status: 'known' });
    await upsertEntry({ word: 'etxe', status: 'unknown' });
    const entries = await getAllEntries();
    expect(entries).to.have.length(2);
  });

  it('looks up an entry with normalization', async () => {
    await upsertEntry({ word: 'Etxe', status: 'unknown', translation: 'house' });
    expect((await lookup('etxe'))?.translation).to.be.equal('house');
    expect(await lookup('ez')).to.be.equal(undefined);
  });

  it('removes an entry', async () => {
    await upsertEntry({ word: 'ura', status: 'known' });
    await removeEntry('URA');
    expect(await getEntry('ura')).to.be.equal(undefined);
  });
});
