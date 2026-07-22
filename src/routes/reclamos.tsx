import { createFileRoute } from "@tanstack/react-router";
import { useForm, type UseFormReturn, type FieldValues, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/reclamos")({
  head: () => ({
    meta: [
      { title: "Reclamos, sugerencias y felicitaciones — RBU Santiago" },
      { name: "description", content: "Canaliza tu reclamo, sugerencia o felicitación. Tu experiencia nos ayuda a mejorar." },
      { property: "og:title", content: "Reclamos, sugerencias y felicitaciones — RBU Santiago" },
      { property: "og:description", content: "Canaliza tu reclamo, sugerencia o felicitación. Tu experiencia nos ayuda a mejorar." },
      { property: "og:url", content: "https://rbusantiago.cl/reclamos" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/reclamos" }],
  }),
  component: ReclamosPage,
});

const comunas = [
  "Santiago","Conchalí","Huechuraba","Independencia","Quilicura","Recoleta","Renca",
  "Las Condes","Lo Barnechea","Providencia","Vitacura","La Reina","Macul","Ñuñoa","Peñalolén",
  "La Florida","La Granja","El Bosque","La Cisterna","La Pintana","San Ramón","Lo Espejo",
  "Pedro Aguirre Cerda","San Joaquín","San Miguel","Cerrillos","Estación Central","Maipú",
  "Cerro Navia","Lo Prado","Pudahuel","Quinta Normal",
];

const servicios = [
  "B05","B06","B11","B12","B12C","B15","B21","B22","B27","B31N",
  "C02c","C03","C03c","C05","C06","C06c","C07","C09","C10e","C11",
  "C13","C14","C15","C16","C17","C19","C20","C27","C28","C37",
  "401c","402","403","404","404c","412","414e","415e","418","421",
  "422c","425","428e","429","429C","430","435","486",
];

const motivos = [
  "Frecuencia del servicio",
  "Comportamiento del conductor",
  "No traslada escolares",
  "No se detiene en paradas",
  "Incumplimiento de ruta",
  "Condición técnica y mecánica del bus",
  "Aseo deficiente del bus",
  "Accidentes",
  "Choques",
  "Problemas terminales o depósitos",
  "Situaciones generalizadas",
  "Monitores",
  "Desaprueba modificación",
];

const baseShape = {
  nombres: z.string().trim().min(2, "Requerido").max(80),
  apellidos: z.string().trim().min(2, "Requerido").max(80),
  email: z.string().trim().email("Email inválido").max(120),
  telefono: z.string().trim().min(8, "Teléfono inválido").max(20),
  comuna: z.string().min(1, "Requerido"),
  direccion: z.string().trim().min(4, "Requerido").max(120),
  servicio: z.string().optional(),
  ppu: z.string().trim().max(10).optional(),
  fecha: z.string().min(1, "Requerido"),
};

const reclamoSchema = z.object({
  ...baseShape,
  motivo: z.string().min(1, "Requerido"),
  lugar: z.string().trim().min(2, "Requerido").max(120),
  comentario: z.string().trim().min(10, "Cuéntanos un poco más").max(2000),
});
const sugerenciaSchema = z.object({
  ...baseShape,
  detalle: z.string().trim().min(10, "Cuéntanos un poco más").max(2000),
});
const felicitacionSchema = sugerenciaSchema;

type ReclamoValues = z.infer<typeof reclamoSchema>;
type SugerenciaValues = z.infer<typeof sugerenciaSchema>;

function TextField<T extends FieldValues>({
  form, name, label, type = "text", placeholder,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} value={field.value ?? ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SelectField<T extends FieldValues>({
  form, name, label, options, placeholder = "Selecciona",
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={(field.value as string) ?? ""}>
            <FormControl>
              <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-72">
              {options.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ReclamoForm() {
  const form = useForm<ReclamoValues>({
    resolver: zodResolver(reclamoSchema),
    defaultValues: {
      nombres:"", apellidos:"", email:"", telefono:"", comuna:"", direccion:"",
      motivo:"", servicio:"", ppu:"", fecha:"", lugar:"", comentario:"",
    },
  });
  const onSubmit = (v: ReclamoValues) => {
    console.log("Reclamo", v);
    toast.success("Recibimos tu reclamo", { description: "Gracias por ayudarnos a mejorar." });
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField form={form} name="nombres" label="Nombres *" />
          <TextField form={form} name="apellidos" label="Apellidos *" />
          <TextField form={form} name="email" label="Email *" type="email" />
          <TextField form={form} name="telefono" label="Teléfono *" type="tel" />
          <SelectField form={form} name="comuna" label="Comuna *" options={comunas} />
          <TextField form={form} name="direccion" label="Dirección *" />
          <SelectField form={form} name="motivo" label="Motivo *" options={motivos} />
          <SelectField form={form} name="servicio" label="Servicio" options={servicios} />
          <TextField form={form} name="ppu" label="PPU (opcional)" placeholder="AB1234" />
          <TextField form={form} name="fecha" label="Fecha del evento *" type="date" />
          <div className="sm:col-span-2">
            <TextField form={form} name="lugar" label="Lugar del evento *" />
          </div>
        </div>
        <FormField
          control={form.control}
          name="comentario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentario *</FormLabel>
              <FormControl><Textarea rows={5} maxLength={2000} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:opacity-90" size="lg">ENVIAR</Button>

        <div className="mt-8 rounded-r-xl rounded-l-none border-l-4 border-[#0047BA] bg-[#A4A9AD]/20 p-5 text-sm text-[color:var(--gray-dark)]">
          <p className="font-semibold text-primary">Canales de atención RBU:</p>
          <ul className="mt-2 space-y-1">
            <li><strong>Teléfono:</strong> 600 488 1800</li>
            <li><strong>Correo:</strong> consultas.rbu@transdev.cl</li>
          </ul>

          <p className="mt-4 font-semibold text-primary">Para ingresar un reclamo en segunda instancia, puede realizarlo en los siguientes canales:</p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>OIRS Transportescucha:</strong>{" "}
              <a href="https://www.transportescucha.cl" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.transportescucha.cl</a>,
              {" "}o al teléfono (+562) 22362222
            </li>
            <li>
              <strong>Directorio de Transporte Público Metropolitano:</strong>{" "}
              <a href="https://www.red.cl" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.red.cl</a>,
              {" "}o al Call center 600 730 00 73 (desde celulares) o al 800 73 00 73 (desde teléfono fijo)
            </li>
          </ul>
        </div>
      </form>
    </Form>
  );
}

function SimpleForm({ kind }: { kind: "sugerencia" | "felicitacion" }) {
  const form = useForm<SugerenciaValues>({
    resolver: zodResolver(kind === "sugerencia" ? sugerenciaSchema : felicitacionSchema),
    defaultValues: {
      nombres:"", apellidos:"", email:"", telefono:"", comuna:"", direccion:"",
      servicio:"", ppu:"", fecha:"", detalle:"",
    },
  });
  const onSubmit = (v: SugerenciaValues) => {
    console.log(kind, v);
    toast.success(
      kind === "sugerencia" ? "Recibimos tu sugerencia" : "¡Gracias por tus felicitaciones!",
      { description: kind === "sugerencia" ? "La revisaremos con atención." : "Se la haremos llegar al equipo." },
    );
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField form={form} name="nombres" label="Nombres *" />
          <TextField form={form} name="apellidos" label="Apellidos *" />
          <TextField form={form} name="email" label="Email *" type="email" />
          <TextField form={form} name="telefono" label="Teléfono *" type="tel" />
          <SelectField form={form} name="comuna" label="Comuna *" options={comunas} />
          <TextField form={form} name="direccion" label="Dirección *" />
          <SelectField form={form} name="servicio" label="Servicio" options={servicios} />
          <TextField form={form} name="ppu" label="PPU (opcional)" />
          <TextField form={form} name="fecha" label="Fecha *" type="date" />
        </div>
        <FormField
          control={form.control}
          name="detalle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{kind === "sugerencia" ? "Detalle de sugerencia *" : "Detalle de felicitación *"}</FormLabel>
              <FormControl><Textarea rows={5} maxLength={2000} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:opacity-90" size="lg">ENVIAR</Button>
      </form>
    </Form>
  );
}

function ReclamosPage() {
  return (
    <>
      <PageHero
        eyebrow="Atención a usuarias y usuarios"
        title="Escuchamos tu experiencia"
        description="Comparte tu reclamo, sugerencia o felicitación. Nos ayudas a movernos mejor contigo."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Tabs defaultValue="reclamo" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="reclamo" className="data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">Reclamos</TabsTrigger>
            <TabsTrigger value="sugerencia" className="data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">Sugerencias</TabsTrigger>
            <TabsTrigger value="felicitacion" className="data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">Felicitaciones</TabsTrigger>
          </TabsList>
          <TabsContent value="reclamo" className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <ReclamoForm />
          </TabsContent>
          <TabsContent value="sugerencia" className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <SimpleForm kind="sugerencia" />
          </TabsContent>
          <TabsContent value="felicitacion" className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <SimpleForm kind="felicitacion" />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
