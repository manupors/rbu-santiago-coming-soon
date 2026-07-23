import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ofertas-laborales")({
  head: () => ({
    meta: [
      { title: "Ofertas Laborales — RBU Santiago" },
      { name: "description", content: "Únete al equipo de RBU Santiago. Empresa certificada NCh3262, comprometida con la equidad de género." },
      { property: "og:title", content: "Ofertas Laborales — RBU Santiago" },
      { property: "og:description", content: "Únete al equipo de RBU Santiago. Empresa certificada NCh3262, comprometida con la equidad de género." },
      { property: "og:url", content: "https://rbusantiago.cl/ofertas-laborales" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/ofertas-laborales" }],
  }),
  component: OfertasLaboralesPage,
});

const rutRegex = /^\d{7,8}-[\dkK]$/;

const schema = z
  .object({
    apellidoPaterno: z.string().trim().min(2, "Requerido").max(60),
    apellidoMaterno: z.string().trim().min(2, "Requerido").max(60),
    nombres: z.string().trim().min(2, "Requerido").max(80),
    rut: z.string().trim().regex(rutRegex, "Formato: 11111111-1"),
    licencia: z.enum(["A1", "A3", "B", "OTRO"], { message: "Selecciona una opción" }),
    otraLicencia: z.string().trim().max(50).optional(),
    telefono: z.string().trim().min(8, "Teléfono inválido").max(20),
    email: z.union([z.string().trim().email("Email inválido"), z.literal("")]).optional(),
    comuna: z.string().trim().min(2, "Requerido").max(60),
    direccion: z.string().trim().min(4, "Requerido").max(120),
    origen: z.string().min(1, "Requerido"),
    autorizacion: z.boolean().refine((v) => v, "Debes autorizar el uso de datos"),
    condiciones: z.boolean().refine((v) => v, "Debes aceptar las condiciones"),
  })
  .refine(
    (d) => (d.licencia === "OTRO" ? Boolean(d.otraLicencia && d.otraLicencia.trim().length > 0) : true),
    { message: "Indica el tipo de licencia", path: ["otraLicencia"] },
  );

type FormValues = z.infer<typeof schema>;

const origenOptions = [
  "Cenefa del bus",
  "Referido",
  "Reintegro",
  "Redes Sociales",
  "OMIL",
  "Automóvil Club",
  "Radio",
  "Otros",
];

function OfertasLaboralesPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      rut: "",
      licencia: undefined as unknown as FormValues["licencia"],
      otraLicencia: "",
      telefono: "",
      email: "",
      comuna: "",
      direccion: "",
      origen: "",
      autorizacion: false,
      condiciones: false,
    },
  });

  const licencia = form.watch("licencia");

  const onSubmit = (values: FormValues) => {
    const subject = `Postulación: ${values.nombres} ${values.apellidoPaterno} ${values.apellidoMaterno}`;
    const bodyLines = [
      `Nombres: ${values.nombres}`,
      `Apellido Paterno: ${values.apellidoPaterno}`,
      `Apellido Materno: ${values.apellidoMaterno}`,
      `RUT: ${values.rut}`,
      `Licencia: ${values.licencia}${values.licencia === "OTRO" && values.otraLicencia ? ` (${values.otraLicencia})` : ""}`,
      `Teléfono: ${values.telefono}`,
      `Email: ${values.email ?? ""}`,
      `Comuna: ${values.comuna}`,
      `Dirección: ${values.direccion}`,
      `¿Cómo se enteró?: ${values.origen}`,
    ];
    const mailto = `mailto:rbu.seleccion@transdev.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    toast.success("¡Abriendo tu correo!", {
      description: "Adjunta tu CV en el correo antes de enviarlo a rbu.seleccion@transdev.cl.",
    });
    form.reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Trabaja con nosotros"
        title="Únete a nuestro equipo"
        description="En RBU Santiago somos la primera empresa certificada bajo la norma NCh3262. Valoramos la diversidad y promovemos la equidad de género. Únete a un ambiente inclusivo donde tu talento será el motor de nuestra compañía."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="apellidoPaterno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Paterno *</FormLabel>
                    <FormControl><Input maxLength={60} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellidoMaterno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Materno *</FormLabel>
                    <FormControl><Input maxLength={60} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres *</FormLabel>
                  <FormControl><Input maxLength={80} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="rut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RUT *</FormLabel>
                    <FormControl><Input placeholder="11111111-1" maxLength={12} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Licencia de Conducir *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A1">A1 (ley 18.290)</SelectItem>
                        <SelectItem value="A3">A3</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="OTRO">OTRO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {licencia === "OTRO" && (
              <FormField
                control={form.control}
                name="otraLicencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Otro tipo de licencia *</FormLabel>
                    <FormControl><Input maxLength={50} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <FormControl><Input type="tel" maxLength={20} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" maxLength={120} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="comuna"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comuna de Residencia *</FormLabel>
                    <FormControl><Input maxLength={60} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección *</FormLabel>
                    <FormControl><Input maxLength={120} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="origen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Cómo se enteró? *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {origenOptions.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="text-sm font-medium">CV (opcional)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="mt-2 block w-full text-sm text-[color:var(--gray-dark)] file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:opacity-90"
              />
              <p className="mt-1 text-xs text-muted-foreground">Formatos aceptados: PDF, DOC, DOCX.</p>
            </div>

            <FormField
              control={form.control}
              name="autorizacion"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div>
                    <FormLabel className="text-sm font-normal leading-snug">
                      Autorizo a RBU Santiago a recopilar y utilizar la información ingresada. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condiciones"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div>
                    <FormLabel className="text-sm font-normal leading-snug">
                      Acepto las condiciones y la política de tratamiento de datos. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:opacity-90"
              size="lg"
            >
              ENVIAR
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}
