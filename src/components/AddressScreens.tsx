import { useState } from 'react'
import type { Address } from '../types'
import location from '../assets/figma/icon-location.svg'
import check from '../assets/figma/source/address-check.svg'
import cancel from '../assets/figma/source/address-cancel.svg'
import { Button } from './Button'

export function AddressListScreen({ addresses, onAdd, onEdit, onSetDefault }: { addresses: Address[]; onAdd: () => void; onEdit: (address: Address) => void; onSetDefault: (id: string) => void }) {
  return (
    <main className="standalone-screen secondary-screen address-list-screen">
      <section>{addresses.map((address) => <article className="address-card" key={address.id}><span className={address.verified ? 'identity-tag verified' : 'identity-tag'}>{address.verified ? '実名認証済み' : '認証が必要'}</span><button className="address-content" onClick={() => onEdit(address)}><img src={location} alt="" /><span><b>{address.name}</b><b>{address.phone}</b><p>〒{address.postalCode} {address.prefecture}{address.street} {address.building}</p><small>編集</small></span></button><button className="default-address" onClick={() => onSetDefault(address.id)}><i className={address.isDefault ? 'checked' : ''}>{address.isDefault && <img src={check} alt="" />}</i>デフォルトの住所に設定する</button></article>)}</section>
      <div className="sticky-form-action"><Button block onClick={onAdd}>新しい住所を追加</Button></div>
    </main>
  )
}

export function AddressFormScreen({ initialAddress, onSave }: { initialAddress?: Address | null; onSave: (address: Address) => void }) {
  const [form, setForm] = useState(initialAddress ? { name: initialAddress.name, phone: initialAddress.phone, postalCode: initialAddress.postalCode.replace(/-/g, ''), prefecture: initialAddress.prefecture, street: initialAddress.street, building: initialAddress.building } : { name: '山田 太郎', phone: '090-1234-5678', postalCode: '123-ABCD', prefecture: '', street: '', building: '' })
  const [submitted, setSubmitted] = useState(!initialAddress)
  const postalError = submitted && !/^\d{7}$/.test(form.postalCode)
  const valid = form.name && form.phone && /^\d{7}$/.test(form.postalCode) && form.prefecture && form.street
  const fields = [
    ['name', '氏名', '山田 太郎'], ['phone', '電話番号', '090-1234-5678'], ['postalCode', '郵便番号', 'ハイフンなし（例：1234567）'], ['prefecture', '都道府県', '選択してください'], ['street', '市区町村・番地', '新宿区西新宿3丁目7-1'], ['building', '建物名・部屋番号（任意）', '新宿パークタワー 10F'],
  ] as const
  return (
    <main className="address-form-screen">
      <span className="sheet-handle" />
      <h1>{initialAddress ? '配送先住所を編集' : '新規配送先住所'}</h1>
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); if (valid) onSave({ id: initialAddress?.id ?? String(Date.now()), ...form, isDefault: initialAddress?.isDefault ?? true, verified: initialAddress?.verified }) }}>
        {fields.map(([name, label, placeholder]) => {
          const isPostal = name === 'postalCode'
          const mutedField = ['prefecture', 'street', 'building'].includes(name)
          return <label key={name}>{label}<span className={`${postalError && isPostal ? 'form-control error' : 'form-control'} ${mutedField ? 'form-control--muted' : ''}`}><input value={form[name]} placeholder={placeholder} onChange={(event) => setForm({ ...form, [name]: event.target.value })} />{isPostal && form[name] && <button type="button" onClick={() => setForm({ ...form, [name]: '' })}><img src={cancel} alt="" /></button>}</span>{postalError && isPostal && <small>郵便番号は7桁の半角数字で入力してください</small>}</label>
        })}
        <label className="form-checkbox"><input type="checkbox" defaultChecked={Boolean(initialAddress)} /><i><img src={check} alt="" /></i>デフォルトの住所に設定する</label>
        <Button block disabled={!valid}>住所を保存</Button>
      </form>
    </main>
  )
}
